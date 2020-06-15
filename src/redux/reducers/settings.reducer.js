

const initialState = {
  volume: 0.5, // some stuff like mini-games have sounds, should not be at 100% volume I guess
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: return state;
  }
}