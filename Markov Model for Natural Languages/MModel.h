// Copyright 2020 Jessica Hall

#ifndef MMODEL_H  // NOLINT
#define MMODEL_H
#include <iostream>
#include <map>
#include <string>
#include <stdexcept>
#include <vector>
#include <utility>
#include <algorithm>


class MModel {
 public:
  MModel(std::string text, int k);
  int kOrder();
  int freq(std::string kgram);
  int freq(std::string kgram, char c);
  char kRand(std::string kgram);
  std::string generate(std::string kgram, int L);
  friend std::ostream& operator<< (std::ostream &out, MModel &x);
 private:
  int order;
  std::string alphabet;
  std::map <std::string, int> kgrams;
};
#endif // NOLINT
