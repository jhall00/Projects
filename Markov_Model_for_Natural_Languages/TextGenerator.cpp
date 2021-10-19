// Copyright 2020 Jessica Hall

#include "MModel.h"
#include <string>

int main(int argc, const char* argv[]) {
  if (argc != 3) {
    std::cout << "Enter ./TextGenerator k L";
    return 0;
  }

  std::string k_str = argv[1];
  std::string L_str = argv[2];

  int k = std::stoi(k_str);
  int L = std::stoi(L_str);
  std::string in;
  std::string text;

  while (std::cin >> text) {
    in += text;
  }

  MModel sim(in, k);

  std::string output = "";
  output += sim.generate(in.substr(0, k), L);
  std::cout << sim;

  std::cout << std::endl << "Generated Text is " << std::endl;
  for (int i = 0; i < L; i++) {
    std::cout << output[i];
  }

  std::cout << std::endl;
  return 0;
}
