module.exports = {
    content: ['./src/modules/**/*.html', './src/modules/**/*.ts'],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {
            keyframes: {
                'slide-left': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateX(0)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateX(-320px)'
                    }
                },
                'slide-right': {
                    '0%': {
                        opacity: '1',
                        transform: 'translateX(-320px)'
                    },
                    '100%': {
                        opacity: '0.8',
                        transform: 'translateX(0)'
                    }
                }
            },
            animation: {
                'slide-in-left': 'slide-left 0.3s ease-out forwards',
                'slide-out-right': 'slide-right 0.3s ease-out forwards'
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
