// Copyright 2020 Jessica Hall

#define BOOST_TEST_DYN_LINK
#define BOOST_TEST_MODULE Main
#include <boost/test/included/unit_test.hpp>

#include "MModel.h"
#include <iostream>
#include <string>
#include <stdexcept>

BOOST_AUTO_TEST_CASE(sample) {
  MModel m("gagggagaggcgagaaa", 2);

  BOOST_REQUIRE(m.kOrder() == 2);

  BOOST_REQUIRE_THROW(m.freq(""), std::runtime_error);
  BOOST_REQUIRE_THROW(m.freq("a"), std::runtime_error);
  BOOST_REQUIRE_NO_THROW(m.freq("aa"));
  BOOST_REQUIRE_THROW(m.freq("aaa"), std::runtime_error);
  BOOST_REQUIRE_THROW(m.freq("", 'a'), std::runtime_error);
  BOOST_REQUIRE_THROW(m.freq("a", 'a'), std::runtime_error);
  BOOST_REQUIRE_NO_THROW(m.freq("aa", 'a'));
  BOOST_REQUIRE_THROW(m.freq("aaa", 'a'), std::runtime_error);

  BOOST_REQUIRE_THROW(m.kRand("a"), std::runtime_error);
  BOOST_REQUIRE_NO_THROW(m.kRand("aa"));
  BOOST_REQUIRE_THROW(m.kRand("b"), std::runtime_error);  // b not in alpha

  BOOST_REQUIRE_THROW(m.generate("a", 4), std::runtime_error);
  BOOST_REQUIRE_NO_THROW(m.generate("aa", 3));

  BOOST_REQUIRE(m.freq("aa") == 2);
  BOOST_REQUIRE(m.freq("aa", 'a') == 1);
  BOOST_REQUIRE(m.freq("aa", 'c') == 0);
  BOOST_REQUIRE(m.freq("aa", 'g') == 1);

  BOOST_REQUIRE(m.freq("ag") == 5);
  BOOST_REQUIRE(m.freq("ag", 'a') == 3);
  BOOST_REQUIRE(m.freq("ag", 'c') == 0);
  BOOST_REQUIRE(m.freq("ag", 'g') == 2);

  BOOST_REQUIRE(m.freq("cg") == 1);
  BOOST_REQUIRE(m.freq("cg", 'a') == 1);
  BOOST_REQUIRE(m.freq("cg", 'c') == 0);
  BOOST_REQUIRE(m.freq("cg", 'g') == 0);

  BOOST_REQUIRE(m.freq("ga") == 5);
  BOOST_REQUIRE(m.freq("ga", 'a') == 1);
  BOOST_REQUIRE(m.freq("ga", 'c') == 0);
  BOOST_REQUIRE(m.freq("ga", 'g') == 4);

  BOOST_REQUIRE(m.freq("gc") == 1);
  BOOST_REQUIRE(m.freq("gc", 'a') == 0);
  BOOST_REQUIRE(m.freq("gc", 'c') == 0);
  BOOST_REQUIRE(m.freq("gc", 'g') == 1);

  BOOST_REQUIRE(m.freq("gg") == 3);
  BOOST_REQUIRE(m.freq("gg", 'a') == 1);
  BOOST_REQUIRE(m.freq("gg", 'c') == 1);
  BOOST_REQUIRE(m.freq("gg", 'g') == 1);
}
