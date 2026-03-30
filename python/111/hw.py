import random
print('Guess the Number Game!')

rand_number = random.randint(1, 101)
guess_Amount = 1

name = input("Please enter your name:")
print(
    f"Hello, {name}! Guess a number from 1 to 100")


def validate_input(user_input):
    while True:
        value = input(user_input)
        try:
            return int(value)
        except ValueError:
            print("Invalid input. Please enter a number.")


guess = validate_input("Enter your guess: ")


while guess != rand_number:
    if guess > rand_number:
        print("Too high! Try again.")
        guess_Amount += 1
        guess = validate_input("What is your next guess? ")
    elif guess < rand_number:
        print("Too low! Try again.")
        guess_Amount += 1
        guess = validate_input("What is your next guess? ")
        guess = int(guess)
    else:
        print("Congratulations! You guessed the number!")
        break


print(f"Great job, {name}! You guessed the number in {guess_Amount} tries.")
