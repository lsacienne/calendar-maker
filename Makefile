CC = gcc
CFLAGS =-Werror -pedantic -g -ansi -Wall -std=c99
EXEC = calendar-maker.exe

all: $(EXEC)

$(EXEC): lib.o main.o
	$(CC) -o $@ $^

lib.o: calendar.c
	$(CC) -o $@ -c $< $(CFLAGS)

main.o: main.c calendar.h
	$(CC) -o $@ -c $< $(CFLAGS)

clean:
	del *.o $(EXEC)