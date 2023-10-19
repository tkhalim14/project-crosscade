from pathlib import Path

import os
from gpt4all import GPT4All

gpt_model_path = os.path.join(os.getcwd(),'model')

def hint_fetcher(word, meaning, bool_ai = False):
    
    if bool_ai==False:
        return {'word':word,'riddle': 'Clue: You are Good Guy'}
    
    if os.path.exists(gpt_model_path):
        print('Done')
    else:
        os.mkdir(os.path.join(os.getcwd(),'model'))

    model = GPT4All(model_name='llama-2-7b-chat.ggmlv3.q4_0.bin', model_path=gpt_model_path, allow_download=True)

    system_template = 'You are now a riddle generator. Your task is to generate a clue for the user given input a word.'
    # many models use triple hash '###' for keywords, Vicunas are simpler:
    prompt_template = 'USER: {0}\nASSISTANT: '
    with model.chat_session(system_template, prompt_template):
        text = model.generate(prompt=f'Word : {word}, Meaning : {meaning}', temp=0.8, repeat_penalty=1.2)
        # print(model.current_chat_session)
    # average time 14s
    return text

# print(hint_fetcher("cat","A household pet"))