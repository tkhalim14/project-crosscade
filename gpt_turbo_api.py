import requests, json
import constants

import gpt4all


def hint_fetcher(word):

    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {constants.OPENAI_API_KEY}"
    }


    cmd = [
            {
                "role": "system", 
                "content": "You are a riddle master with 200 IQ. Your task is to generate 3 clues for a given a word from user. Difficulty of riddle is easy."
            },
            {
                "role": "user",
                "content": "Word : Earth"
            }
        ]

    data = {
        "model" : 'gpt-3.5-turbo',
        "messages" : cmd,
        "temperature" : 0.2,
        }

    response = requests.post(url, headers=headers, data=json.dumps(data))

    get_content = response.json()['choices'][0]['message']['content']
    with open('./static/data/script.txt', 'w') as file:
        file.write(get_content)