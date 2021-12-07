module.exports = {
    mode: 'jit',
    purge: ['./src/modules/orion_labs/**/*.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            keyframes: {
                'slide-in-left': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateX(300px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateX(0)'
                    }
                }
            },
            animation: {
                'slide-in-left': 'slide-in-left 0.3s ease-out'
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
