import random
print('Hello welcome to the die game!')


class Die:

    def __init__(self, sides):
        self.sides = sides

    def roll(self):
        return  random.randint(1, self.sides)


while True:
    sides = input('Chose a number of sides for your die: ')
    try:
        sides = int(sides)
        if (sides > 0):
            die = Die(sides)
            print(f'rolling a {sides} sided die ')
            for i in range(10):
                result = die.roll()
                print(f'Roll {i+1}: {result}')
            break
        else:
            print('Please pick a postive number')

    except:
        print('Invalid input please try again.')
        sides = input('chose a number')
