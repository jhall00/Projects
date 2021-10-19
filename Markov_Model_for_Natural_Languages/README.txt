Markov Model of Natural Language
Jessica Hall
Spring 2020

The goal of this assignment was to generate predictive text based on the Markov model of natural language. 
The text is formed from characters that exist in the text file inputted from the terminal. 
The frequency of each character is recorded. The other frequency function (with 2 parameters) counts the 
frequency of the kgram string of characters followed by each particular character of the alphabet from the file. 
Text is generated based on this frequency data.

I used a map to store the kgrams, the k+1 grams, and their associated frequencies. 
I used multiple vectors for kRand. I used a vector to hold all the characters in the alphabet whose 
probability for following the kgram wasn't zero. I used another vector to hold the indices of the elements 
of the previous mentioned vector with the 5 highest probabilities of occuring. Then this index was chosen randomly.


Link to assignment instructions: https://www.cs.uml.edu/ecg/index.php/Comp4spr15/PS6

