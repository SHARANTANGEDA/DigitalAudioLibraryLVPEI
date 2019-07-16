module.exports = (sequelize, DataTypes) => {
  return sequelize.define("pbi_dal_view", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ageCategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qualification: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pinCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bookCategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bookLanguage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bookAuthor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    month: {
      type:DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quarter: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { timestamps: false });
};

