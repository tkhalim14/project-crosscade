import requests, json
import constants

from gpt4all import GPT4All


def hint_fetcher(word):

    model = GPT4All(model_name='orca-mini-3b.ggmlv3.q4_0.bin')
    with model.chat_session():
        response1 = model.generate(prompt='You are a riddle master with 200 IQ. Your task is to generate 3 clues for a given a word from user. Difficulty of riddle is easy.', temp=0)
        response2 = model.generate(prompt='Word : Earth', temp=0)
        response3 = model.generate(prompt='thank you', temp=0)
        print(model.current_chat_session)

    # get_content = response.json()['choices'][0]['message']['content']
    # with open('./static/data/script.txt', 'w') as file:
    #     file.write(get_content)

hint_fetcher("cat")