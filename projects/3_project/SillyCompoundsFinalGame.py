# importing LADEC (compound data) from https://era.library.ualberta.ca/items/dc3b9033-14d0-48d7-b6fa-6398a30e61e4
from operator import index
import random
import pandas as pd

LADEC_ref = pd.read_csv(r"C:\Users\Amand\Downloads\LADECv1-2019.csv")

# beginning of program
name = input("What is your name, grasshopper? ")
print("Hello " + name + "! Welcome to SILLY COMPOUNDS!")
print("""
The goal of this game is to determine if randomly generated 
compounds are real words or not! A compound is formed from 
two words joined together to create a new word with a 
deeper or different meaning. Some examples are 'football', 
'birdbath', and 'strawberry'!
    """)
print("Type 'start' to begin.")
# while loop until player types 'start'
while True:
    shall_we_begin = input("Shall we begin? ")
    if shall_we_begin == "start":
        print("Ok!")
        break
    else:
        print("Uhh ok... What about now? ")
        pass

# while loop for infinite gameplay
while True:
    while random.randint(0, 100) < 70:  # giving a true and common compound word 70% of the time
        total_rows = len(LADEC_ref)
        rand_row = random.randint(0, total_rows - 1) # random row from all possible rows is selected
        works = LADEC_ref.iloc[rand_row, [3, 35]] # compound word and if it is common (1 = yes, 0 = no)
        if works[1] == 1: # if game is for young students, it is important that the words are common
            generated_compound = works[0]
            print(generated_compound)
            break
        else:
            pass
    else: # creating made-up word from random "beginnings" and "endings" of compound words
        randc1 = random.choice(LADEC_ref.c1)
        randc2 = random.choice(LADEC_ref.c2)
        generated_compound = (randc1 + randc2)
        print(generated_compound)

    while True: # action based upon player's response
        yes_or_no = input("Is " + generated_compound + " a correct word? ")
        if yes_or_no == "yes" and generated_compound == works[0]:
            print("Correct!")
            break
        elif yes_or_no == "no" and generated_compound == works[0]:
            print("Not correct, " + generated_compound + " is a real compound word.")
            break
        elif yes_or_no == "yes" and generated_compound == (randc1 + randc2):
            print("Not correct, " + generated_compound + " is not a real compound word.")
            break
        elif yes_or_no == "no" and generated_compound == (randc1 + randc2):
            print("Correct, " + generated_compound + " is a made up compound.")
            break
        else:
            print("please type 'yes' or 'no'")
            pass
    pass
