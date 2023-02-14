from app.models import db, Instruction, Recipe
from .ingredients import ingredients
from .users import demo

recipes = {
    'scrambled_eggs': {
        'recipe': Recipe(name='Scrambled eggs', description='Creamy scrambled eggs.'),
        'ingredients': [
            ingredients.get('egg'),
            ingredients.get('butter'),
            ingredients.get('salt'),
            ingredients.get('pepper')
        ],
        'instructions': [
            Instruction(
                order=1, body='Crack and beat eggs until the whites and yolks are completely combined.'),
            Instruction(
                order=2, body='Melt butter in a nonstick pan over medium heat.'),
            Instruction(order=3, body='Add the eggs into the pan and stir.'),
            Instruction(order=4, body='Season with salt and pepper to taste.'),
            Instruction(order=5, body='Serve and enjoy.')
        ]
    },
    'tomato_and_egg': {
        'recipe': Recipe(name='Tomato and egg', description='Delicous sweet and sour tomato and egg stir fry'),
        'ingredients': [
            ingredients.get('tomato'),
            ingredients.get('egg'),
            ingredients.get('sugar'),
            ingredients.get('salt'),
            ingredients.get('oil')
        ],
        'instructions': [
            Instruction(
                order=1, body='In a pot, boil enough water to completely submerge the tomatoes.'),
            Instruction(
                order=2, body='While the water is boiling, lightly score the tomato skin in an "X" across the bottom, and prepare a bowl of cold or ice water.'),
            Instruction(
                order=3, body='Add the tomatoes into the boiling water for about 30 seconds, then remove and place them in the bowl of cold/ice water.'),
            Instruction(
                order=4, body='Peel the skin off the tomatoes and chop them into small wedges. Then crack and beat the eggs in a bowl.'),
            Instruction(
                order=5, body='In a cold pan/wok add in oil and sugar and turn the heat to a medium. Once the sugar starts to slightly bubble, stir until the turns to a caramel color. Turn the heat up to high and add in the tomatoes and a pinch of salt.'),
            Instruction(
                order=6, body='Stir fry the tomatoes until they become soft. Then slowly add in the beaten eggs while continously stirring.'),
            Instruction(
                order=7, body='Once the eggs and tomatoes have been cooked to your liking, serve and enjoy.')
        ]
    }
}

for r in recipes.values():
    recipe = r.get('recipe')
    ingredients = r.get('ingredients')
    instructions = r.get('instructions')

    recipe.ingredients = ingredients
    recipe.instructions = instructions


def seed_recipes():
    demo.recipes = [recipes.get('scrambled_eggs').get('recipe'),
                    recipes.get('tomato_and_egg').get('recipe')]


def unseed_recipes():
    db.session.execute('TRUNCATE TABLE "recipe" RESTART IDENTITY CASCADE;')
