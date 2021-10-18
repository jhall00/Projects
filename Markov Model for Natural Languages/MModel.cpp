// Copyright 2020 Jessica Hall

#include "MModel.h" // NOLINT
#include <map>
#include <string>
#include <vector>
#include <utility>

MModel::MModel(std::string text, int k) {
  order = k;
  int len = text.length();
  std::string circle_text = text;

  // wrap around the first order number of characters
  for (int i = 0; i < order; i++) {
    circle_text += text[i];
  }
  char tester;
  int alphabet_check = 0;

  // create the alphabet

  for (int i = 0; i < len; i++) {
    tester = text[i];
    alphabet_check = 0;

    // alphabet_check variable prevents duplicates,
    // if it's 1  we don't add it again
    for (unsigned int j = 0; j < alphabet.length(); j++) {
      if (alphabet.at(j) == tester) {
        alphabet_check = 1;
      }
    }

    if (alphabet_check == 0) {
      alphabet.push_back(tester);
    }
  }

  // create map
  std::string str1;

  for (int a = order; a <= order + 1; a++) {
    for (int b = 0; b < len; b++) {
      str1.clear();
      str1 = circle_text.substr(b, a);
      // start with each substring occuring 0 times
      kgrams.insert(std::pair<std::string, int>(str1, 0));
    }
  }

  std::map<std::string, int>::iterator it;

  // same as above but now add the frequency of the substring
  for (int a = order; a <= order + 1; a++) {
    for (int b = 0; b < len; b++) {
      str1.clear();
      str1 = circle_text.substr(b, a);
      it = kgrams.find(str1);
      it->second++;
    }
  }
  srand(time(NULL));
}

int MModel::kOrder() {
  return order;
}

int MModel::freq(std::string kgram) {
  std::map<std::string, int>::iterator it;
  if (kgram.length() != static_cast<unsigned>(order)) {
    throw std::runtime_error(" kgram length doesn't equal k");
  }
  it = kgrams.find(kgram);
  if (it == kgrams.end()) {
    return 0;
  }
  return it->second;
}

int MModel::freq(std::string kgram, char c) {
  std::map<std::string, int>::iterator it;
  if (kgram.length() != static_cast<unsigned>(order)) {
    throw std::runtime_error("kgram length doesn't equal k.");
  }

  kgram.push_back(c);
  it = kgrams.find(kgram);
  if (it == kgrams.end()) {
    return 0;
  }

  return it->second;
}

char MModel::kRand(std::string kgram) {
  if (kgram.length() != static_cast<unsigned>(order)) {
    throw std::runtime_error("kgram length does not equal k");
  }

  std::map<std::string, int>::iterator it;
  it = kgrams.find(kgram);

  if (it == kgrams.end()) {
    throw std::runtime_error("No such kgram found");
  }

  int kgram_freq = freq(kgram);
  std::vector<double> prob_char;
  std::vector<double> temp1;
  std::vector<char> rand_char_options;
  double prob_next_char = 0;
  for (unsigned int i = 0; i < alphabet.length(); i++) {
    prob_next_char =
      static_cast<double>(freq(kgram, alphabet[i])) / kgram_freq;

    if (prob_next_char != 0) {
      rand_char_options.push_back(alphabet[i]);
      prob_char.push_back(prob_next_char);
    }
  }

  unsigned int track = 0;
  std::vector<int> max_indices;
  // will produce 5 (or less) elements with the highest probability

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

  // choose a random element from those five chosen
  int rand_index = rand() % max_indices.size(); // NOLINT
  int rand_num = max_indices[rand_index];
  return rand_char_options[rand_num];
}

std::string MModel::generate(std::string kgram, int L) {
  if (kgram.length() != (unsigned)order) {
    throw std::runtime_error("kgram length doesn't equal k");
  }
  char rand_char;
  for (int i = 0; i < L - order; i++) {
    std::string sub = kgram.substr(i, order);
    rand_char = kRand(sub);
    kgram += rand_char;
  }

  return kgram;
}

std::ostream& operator<< (std::ostream &out, MModel &x) {
  out << "Order: " << x.order << std::endl;
  out << "Alphabet: "<< x.alphabet << std::endl;
  out << "Kgrams map:" << std::endl;

  std::map<std::string, int>::iterator it;
  for (it = x.kgrams.begin(); it != x.kgrams.end(); it++) {
    out << "The frequency of " << it->first <<
      " is " << it->second << std::endl;
  }
  return out;
}
