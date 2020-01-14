export const chatReducer = (state, action) => {
    const { topic, from, msg } = action.payload;
    switch (action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {
                        from, msg
                    }
                ]
            }
        default: return state;
    }
}