from pathlib import Path

import os
from gpt4all import GPT4All

gpt_model_path = os.path.join(os.getcwd(),'model')

def hint_fetcher(word):
    if os.path.exists(gpt_model_path):
        print('Done')
    else:
        os.mkdir(os.path.join(os.getcwd(),'model'))
    model = GPT4All(model_name='orca-mini-3b.ggmlv3.q4_0.bin', model_path=gpt_model_path, allow_download=True)

    system_template = 'You are a riddle master with 200 IQ. Your task is to generate 3 clues for a given a word from user. Difficulty of riddle is easy followed by medium followed by hard.'
    # many models use triple hash '###' for keywords, Vicunas are simpler:
    prompt_template = 'USER: {0}\nASSISTANT: '
    text_d = []
    with model.chat_session(system_template, prompt_template):
        text = model.generate(prompt=f'{word}', temp=0.9, repeat_penalty=1.2)
        # print(model.current_chat_session)
    # average time 14s
    text_d = text.split("\n")
    temp = []
    for x in text_d:
        if x!="":
            temp.append(x.split(".")[1:])
    return temp

# hint_fetcher("cat")