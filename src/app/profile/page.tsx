"use client";

import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, Checkbox, Container, Group, Paper, Select, TextInput, Title } from '@mantine/core';
import {HealthBoardDTO} from "@/app/DrsMessTypes";
import {getAccessToken} from "@espresso-lab/mantine-cognito";

export default function Profile() {
    const [healthBoards, setHealthBoards] = useState<HealthBoardDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const form = useForm({
        initialValues: {
            nickname: '',
            healthBoard: '',
            permitEmail: false,
        },
        validate: {
            nickname: (value) => value.length >= 3 ? null : 'Nickname must be at least 3 characters',
            healthBoard: (value) => value ? null : 'Health board is required',
        },
    });

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
    }, []);

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

            alert('Profile saved successfully');
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
                        // data={healthBoards}
                        {...form.getInputProps('healthBoard')}
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
