"""rename user ingredients to pantry

Revision ID: f3b58bf3246c
Revises: 85a0b9ccbf82
Create Date: 2023-02-14 15:22:44.546746

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f3b58bf3246c'
down_revision = '85a0b9ccbf82'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pantry',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('ingredient_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['ingredient_id'], ['ingredient.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'ingredient_id')
    )
    op.drop_table('user_ingredient')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_ingredient',
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('ingredient_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['ingredient_id'], ['ingredient.id'], name='user_ingredient_ingredient_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='user_ingredient_user_id_fkey'),
    sa.PrimaryKeyConstraint('user_id', 'ingredient_id', name='user_ingredient_pkey')
    )
    op.drop_table('pantry')
    # ### end Alembic commands ###
