"use client";

import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, Checkbox, Container, Loader, Select, TextInput, Title } from '@mantine/core';
import { HealthBoardDTO, UserProfileDTO } from "@/app/DrsMessTypes";
import { getAccessToken } from "@espresso-lab/mantine-cognito";

export default function Profile() {
    const [healthBoards, setHealthBoards] = useState<HealthBoardDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [profileLoading, setProfileLoading] = useState(true);

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

    const fetchUserProfile = async () => {
        try {
            const token = await getAccessToken();
            const response = await fetch('/api/v1/profile', {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token ?? ""}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const profile: UserProfileDTO = await response.json();
            form.setValues({
                nickname: profile.nickname,
                healthBoardId: profile.healthBoardId || '',
                permitEmail: profile.permitEmail,
            });
        } catch (error) {
            console.error('Error fetching user profile:', error);
        } finally {
            setProfileLoading(false);
        }
    };

    useEffect(() => {
        const fetchHealthBoards = async () => {
            try {
                const token = await getAccessToken();
                const response = await fetch('/api/v1/health-boards', {
                    headers: {
                        "Authorization": `Bearer ${token ?? ""}`
                    }
                });
                const data: HealthBoardDTO[] = await response.json();
                setHealthBoards(data);
            } catch (error) {
                console.error('Error fetching health boards:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHealthBoards();
        fetchUserProfile();
    }, []);

    if (loading || profileLoading) {
        return (
            <Container size="sm" py="xl" style={{ textAlign: 'center' }}>
                <Loader size="lg" />
                <Title order={3} mt="md">Loading...</Title>
            </Container>
        );
    }

    const handleSubmit = async (values: typeof form.values) => {
        console.log('Form values:', values);
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

        } catch (error) {
            console.error('Error submitting profile:', error);
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
                    data={healthBoards.map((board) => ({ value: board.hbId, label: board.name }))}
                    {...form.getInputProps('healthBoardId')}
                    required
                    mb="md"
                    disabled={loading}
                />

                <Checkbox
                    label="Permit emails"
                    {...form.getInputProps('permitEmail', { type: 'checkbox' })}
                    mb="lg"
                />

                <Button type="submit">Save</Button>
            </form>
        </Container>
    );
}
