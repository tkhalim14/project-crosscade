import random
from nltk.corpus import wordnet

def get_random_word_and_meaning():
    # Get a list of all word synsets (a set of synonyms) in WordNet
    all_synsets = list(wordnet.all_synsets())

    # Choose a random synset
    random_synset = random.choice(all_synsets)

    # Get the word and its definition
    word = random_synset.name().split('.')[0].replace("_", " ")
    meaning = random_synset.definition()

    return word, meaning

random_word, random_meaning = get_random_word_and_meaning()
print(f"Random Word: {random_word}")
print(f"Meaning: {random_meaning}")