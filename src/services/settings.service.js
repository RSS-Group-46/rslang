const prepareSettingsForServer = (settings) => {
  const { wordsPerDay, ...optional } = settings;
  return JSON.stringify({
    wordsPerDay,
    optional
  });
}

export const prepareSettingsForApp = (settings) => {
  console.log(settings);
  const { wordsPerDay, optional } = settings;
  return { wordsPerDay, ...optional };
}

export const pushUserSettings = (settings, userData) => {
  console.log(settings)
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
    .then(response => response.json())
    .catch(error => console.error(error));
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
    return response.json();
  }
  console.log(`settings for user ${userId} is not present`);
  return null;
  // .then(response => response.json())
  // .then(data => {
  //   console.log(data)
  //   return data;
  // })
  // .catch(error => console.error(error));
}