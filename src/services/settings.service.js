const notFoundCode = 404;

const prepareSettingsForServer = (settings) => {
  const { wordsPerDay, ...optional } = settings;
  return JSON.stringify({
    wordsPerDay,
    optional
  });
}

export const prepareSettingsForApp = (settings) => {
  const { wordsPerDay, optional } = settings;
  return { wordsPerDay, ...optional };
}

export const pushUserSettings = (settings, userData) => {
  const normalizedSettings = prepareSettingsForServer(settings);
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
    })
}

export const pullUserSettings = async (userData) => {
  const { userId, token } = userData;
  const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    }
  );
  if (response.ok) {
    return { settings: response.json() };
  }
  if (response.status === notFoundCode) {
    // settings for user is not present;
    return {};
  }
  return { tokenExpired: true };
}