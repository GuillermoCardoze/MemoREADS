"""updated username constraint

Revision ID: 3b0fef320c0f
Revises: 6385d216b546
Create Date: 2024-12-14 13:54:17.373186

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3b0fef320c0f'
down_revision = '6385d216b546'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('books',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('author_id', sa.Integer(), nullable=False),
    sa.Column('genre_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['author_id'], ['authors.id'], name=op.f('fk_books_author_id_authors')),
    sa.ForeignKeyConstraint(['genre_id'], ['genres.id'], name=op.f('fk_books_genre_id_genres')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_books_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('username',
               existing_type=sa.VARCHAR(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('username',
               existing_type=sa.VARCHAR(),
               nullable=True)

    op.drop_table('books')
    # ### end Alembic commands ###
