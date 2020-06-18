const normalizeSettings = (rawSettings) => {
  const { wordsPerDay, ...rest } = rawSettings;
  const { volume, cards } = rest;
  return JSON.stringify({
    wordsPerDay,
    optional: { ...cards, volume }
  })
}

const pushUserSettings = (settings, userData) => {
  const normalizedSettings = normalizeSettings(settings);
  const { userId, token } = userData;
  fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`,
    {
      method: 'PUT',
      body: normalizedSettings,
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    }
  )
    .then(response => response.json())
    .catch(error => console.error(error));
}

export default pushUserSettings;