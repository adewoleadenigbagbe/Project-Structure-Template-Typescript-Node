'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    //users
    queryInterface.createTable('Users', {
        Id: {
            allowNull: false,
            type: Sequelize.UUID,
            primaryKey: true
        },
        Name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        Password: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
        },
        Email: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        CreatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.DATE
      },
      UpdatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.DATE
      }
    });

    //questions
    queryInterface.createTable('Questions', {
        Id: {
            allowNull: false,
            type: Sequelize.UUID,
            primaryKey: true
        },
        Title: {
            allowNull: false,
            type: Sequelize.STRING
        },
        Text: {
            allowNull: false,
            type: Sequelize.TEXT
        },
        Tags: {
            allowNull: false,
            type: Sequelize.TEXT
        },
        Upvote: {
            allowNull: false,
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        Downvote: {
            allowNull: false,
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        UserId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        CreatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.DATE
        },
        UpdatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.DATE
        }
    });

    //answers

    queryInterface.createTable('Answers', {
          Id: {
              allowNull: false,
              type: Sequelize.UUID,
              primaryKey: true
          },
          Text: {
              allowNull: false,
              type: Sequelize.TEXT,
          },
          UserId: {
              type: Sequelize.UUID,
              allowNull: false,
          },
          QuestionId: {
              type: Sequelize.UUID,
              allowNull: false,
              onDelete: 'RESTRICT',
              onUpdate: 'RESTRICT',
              references: {
                  model: 'questions',
                  key: 'questionId',
                  as: 'questionId',
              }
          },
          CreatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.DATE
          },
        UpdatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.DATE
        }
      });

      //subscriptions
        queryInterface.createTable('Subscriptions', {
          Id: {
              allowNull: false,
              type: Sequelize.UUID,
              primaryKey: true
          },
          QuestionId: {
              type: Sequelize.UUID,
              allowNull: false
          },
          UserId: {
              type: Sequelize.UUID,
              allowNull: false.Sequelize
          },
          CreatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.DATE
          },
        UpdatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.DATE
        }

      })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.dropTable('Users');
    queryInterface.dropTable('Questions');
    queryInterface.dropTable('Answers');
    queryInterface.dropTable('Subscriptions');
  }
};
