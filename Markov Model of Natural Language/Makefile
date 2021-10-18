CC = g++
CFLAGS = -std=c++11 -c -g -Og -Wall -Werror -pedantic
OBJ = MModel.o TextGenerator.o
DEPS = MModel.h
LIBS =
EXE = TextGenerator

all: $(OBJ)
	$(CC) $(OBJ) -o $(EXE) $(LIBS)

TextGenerator: $(OBJ)
	$(CC) $(OBJ) -o TextGenerator

tests: MModel.o test.o
	$(CC) MModel.o test.o -o tests

%.o: %.cpp $(DEPS)
	$(CC) $(CFLAGS) -o $@ $<

MModel.o: MModel.cpp $(DEPS)
	$(CC) $(CFLAGS) -o $@ $<
test.o: test.cpp $(DEPS)
	$(CC) $(CFLAGS) -o $@ $<
TextGenerator.o: TextGenerator.cpp $(DEPS)
	$(CC) $(CFLAGS) -o $@ $<
clean:
	\rm $(OBJ) test.o *~ $(EXE) tests
