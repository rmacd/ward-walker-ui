import React from 'react';
import {Loader} from "@mantine/core";

const Loading = () => {
    return (
        <div style={styles.container}>
            <Loader/>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'left',
        fontSize: '24px',
        color: '#000000',
    },
    icon: {
        marginRight: '30px',
    },
    text: {
        fontWeight: 'bold',
    },
};

export default Loading;
