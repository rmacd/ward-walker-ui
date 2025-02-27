"use client";

import {useEffect, useState} from 'react';
import {Button, Checkbox, Container, Loader, Select, TextInput, Title} from '@mantine/core';
import {HealthBoardDTO, UserProfileDTO} from "@/app/DrsMessTypes";
import {getAccessToken} from "@espresso-lab/mantine-cognito";
import {useForm} from '@mantine/form';

import { notifications } from '@mantine/notifications';
import {fetchWithAuth} from "@/utils/fetchWithAuth";

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfileDTO>({});
    const [healthBoards, setHealthBoards] = useState<HealthBoardDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const form = useForm({
        initialValues: {
            nickname: '',
            healthBoardId: '',
            permitEmail: false,
        },
        validate: {
            nickname: (value) => value.length >= 3 ? null : 'Nickname must be at least 3 characters',
            healthBoardId: (value) => value ? null : 'Health board is required',
        },
    });

    useEffect(() => {
        form.setValues({
            nickname: profile.nickname || '',
            healthBoardId: profile.healthBoardId || '',
            permitEmail: profile.permitEmail ?? false,
        })
    }, [profile]);


    useEffect(() => {
        async function fetchData() {
            try {
                const [healthBoardsResponse, profileResponse] = await Promise.all([
                    fetchWithAuth<HealthBoardDTO[]>("/api/v1/health-boards"),
                    fetchWithAuth<UserProfileDTO>("/api/v1/profile"),
                ]);

                console.debug("got hb", healthBoardsResponse);
                console.debug("got profile", profileResponse);

                if (healthBoardsResponse) {
                    setHealthBoards(healthBoardsResponse);
                }
                if (profileResponse) {
                    setProfile(profileResponse);
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                console.debug("Setting 'loading' to false");
                setLoading(false); // Ensures loading is updated only once
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <Container size="sm" py="xl" style={{textAlign: 'center'}}>
                <Loader size="lg"/>
                <Title order={3} mt="md">Loading...</Title>
            </Container>
        );
    }

    const handleSubmit = async (values: typeof form.values) => {
        try {
            const token = await getAccessToken();
            const response = await fetch('/api/v1/profile', {
                method: 'PUT',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token ?? ''}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to save profile');
            }

            notifications.show({
                title: 'Success',
                message: 'Profile saved',
                color: 'green'
            });

        } catch (error) {
            console.error('Error submitting profile:', error);
            notifications.show({
                title: 'Error',
                message: 'Error submitting request',
                color: 'red'
            })
        }
    };

    return (
        <Container size="sm" py="xl">
            <Title order={3}>Edit Profile</Title>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Nickname"
                    placeholder="Enter your nickname"
                    {...form.getInputProps('nickname')}
                    required
                    mb="md"
                />

                <Select
                    label="Health Board"
                    placeholder="Select your health board"
                    data={healthBoards.map((board) => ({value: board.hbId || '', label: board.name || ''}))}
                    {...form.getInputProps('healthBoardId')}
                    required
                    mb="md"
                    disabled={loading}
                />

                <Checkbox
                    label="Permit emails"
                    {...form.getInputProps('permitEmail', {type: 'checkbox'})}
                    mb="lg"
                />

                <Button type="submit">Save</Button>
            </form>
        </Container>
    );
}
