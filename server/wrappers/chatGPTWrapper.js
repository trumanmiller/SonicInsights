const chatGPTWrapper = {};
const openAIKey = process.env.OPENAI_API_KEY;

chatGPTWrapper.getRecomendations = (artist, track) =>
  new Promise(async (resolve, reject) => {
    let response;
    try {
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAIKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'you are helping a machine generate song recommendations for a user, it will send you info about a song that the user likes and you will respond with an array of 3 song recommendations. the machine can only understand valid JSON so you should only respond with an array of arrays in the format of [...["artist", "track"]] and nothing else. the response has to be ONLY valid JSON',
            },
            {
              role: 'user',
              content: `{
                "artist": "${artist}",
                "track": "${track}"
              }`,
            },
          ],
          max_tokens: 120,
          temperature: 0.5,
        }),
      });
    } catch (err) {
      console.error('in chatGPTWrapper.getRecomendations', err.message);
      reject(err.message);
    }
    try {
      const data = await response.json();
      const reccomendations = JSON.parse(data);
      resolve(reccomendations);
    } catch (err) {
      reject(err.message);
    }
  });
