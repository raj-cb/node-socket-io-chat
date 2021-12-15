const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.BIGINT
    },
    dob: {
        type: DataTypes.TEXT
    },
    user_type: {
        type: DataTypes.TINYINT
    },
    designation_id: {
        type: DataTypes.INTEGER
    },
    work_experience: {
        type: DataTypes.INTEGER
    },
    appointment_rate: {
        type: DataTypes.BIGINT
    },
    ondemand_rate: {
        type: DataTypes.BIGINT
    },
    about_yourself: {
        type: DataTypes.TEXT
    },
    password: {
        type: DataTypes.STRING
    },
    password_status: {
        type: DataTypes.STRING
    },
    two_factor_secret: {
        type: DataTypes.TEXT
    },
    two_factor_recovery_codes: {
        type: DataTypes.TEXT
    },
    verification_code: {
        type: DataTypes.STRING
    },
    phone_verified_at: {
        type: DataTypes.TIME
    },
    facebook: {
        type: DataTypes.STRING
    },
    linkedin: {
        type: DataTypes.STRING
    },
    twiter: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.TINYINT
    },
    fcn_tokan: {
        type: DataTypes.STRING
    },
    password_tokan: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE
    },
    updated_at: {
        type: DataTypes.DATE
    },
    gender: {
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING
    },
    api_token: {
        type: DataTypes.TEXT
    },
    email_verified_at: {
        type: DataTypes.DATE
    },
    api_token: {
        type: DataTypes.TEXT
    },
    email_verified_at: {
        type: DataTypes.DATE
    },
    remember_token: {
        type: DataTypes.STRING
    },
    current_team_id: {
        type: DataTypes.BIGINT
    },
    profile_photo_path: {
        type: DataTypes.TEXT
    },
    google: {
        type: DataTypes.STRING
    },
    instagram: {
        type: DataTypes.STRING
    },
    device_token: {
        type: DataTypes.TEXT
    },
    address_latitude: {
        type: DataTypes.DOUBLE
    },
    address_longitude: {
        type: DataTypes.DOUBLE
    },
});

module.exports = User;