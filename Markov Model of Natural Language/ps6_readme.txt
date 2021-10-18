/**********************************************************************
 *  readme.txt template                                                   
 *  Markov Model
 **********************************************************************/

Name: Jessica Hall

Hours to complete assignment: 6 hours
/**********************************************************************
 *  Briefly discuss the assignment itself and what you accomplished.
 **********************************************************************/
The goal of this assignment was to generate predictive text based on the Markov model of natural language. The text is formed from characters that exist in the text file inputted from the terminal. The frequency that each character is recorded. The other frequency function (with 2 parameters) counts the frequency of the kgram string of characters followed by each particular character of the alphabet from the file. Text is generated based on this frequency data.


  /**********************************************************************
 *  Discuss one or more key algorithms, data structures, or 
 *  OO designs that were central to the assignment.
 **********************************************************************/
I used a map to store the kgrams, the k+1 grams, and their associated frequencies. 
I used multiple vectors for kRand. I used a vector to hold all the characters in the alphabet whose probability for following the kgram wasn't zero. I used another vector to hold the indices of the elements of the previous mentioned vector with the 5 highest probabilities of occuring. Then this index was chosen randomly.


/**********************************************************************
 *  Briefly explain the workings of the features you implemented.
 *  Include code excerpts.
 **********************************************************************/
for kRand, I implemented a way to choose the most likely characters for larger files, but still have it be somewhat random. I choose the five characters with the higest probability of ocurring. I recorded the indices of these by adding them to a vector. It then chooses a random index from that vector. The charcter at that index in rand_char_options is then returned.

unsigned int track = 0;
std::vector<int> max_indices;
while (track < 5 && track <= prob_char.size()) {
    std::vector<double>::iterator result =
      std::max_element(prob_char.begin(), prob_char.end());
    int index = std::distance(prob_char.begin(), result);
    // set index of current largest element to zero
    // so it won't be counted in next round of the loop
    prob_char[index] = 0;
    max_indices.push_back(index);
    track++;
  }
  int rand_index = rand() % max_indices.size(); // NOLINT
  int rand_num = max_indices[rand_index];
  return rand_char_options[rand_num];


/**********************************************************************
 *  Did you complete the whole assignment?
 *  Successfully or not? 
 *  Indicate which parts you think are working, and describe
 *    how you know that they're working.
 **********************************************************************/
Yes, it all works successfully. It passes all boost tests and produces valid outputs to given files.


/**********************************************************************
 *  Does your implementation pass the unit tests?
 *  Indicate yes or no, and explain how you know that it does or does not.
 **********************************************************************/
Yes, I receive the message that all boost tests that no errors were detected.

**Also if you want to run the boost tests, I had to separate them in the Makefile, otherwise there would be two main functions. After you make and run ./TextGenerator type make tests then run ./tests


 /**********************************************************************
 *  Describe where you used exceptions. 
 *  Provide files and lines of the code.
 ***********************************************************************/
Exceptions to test that kgrams is same length as order.
Lines 72, 84, 98, 146

Exception when the kgram passed isn't in the map 105



/**********************************************************************
 *  List whatever help (if any) you received from lab TAs,
 *  classmates, or anyone else.
 **********************************************************************/
N/A

/**********************************************************************
 *  Describe any serious problems you encountered.                    
 **********************************************************************/



/**********************************************************************
 *  List any other comments here.                                     
 **********************************************************************/

