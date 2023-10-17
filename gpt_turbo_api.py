import requests, json
import constants


def hint_fetcher(word):

    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {constants.OPENAI_API_KEY}"
    }


    cmd = [
            {
                "role": "system", 
                "content": f"You are now a world famous Instagram Reels script writer and have access to variety of video content on the internet."
            },
            {
                "role": "system", 
                "content": f"Whenever you write a script, you start the video details with the prefix 'Video of'. Then, you put narrator's voice line on the next line in {userInput['lang']} which is written using romanization with the prefix 'Narrator:' with no enclosing brackets."
            },
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