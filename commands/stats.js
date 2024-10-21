const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const fs = require('fs')
const path = require('path')
// const statsFile = path.resolve(__dirname, '../data/stats.txt')
const queryPath = path.resolve(__dirname, '../data/query.txt')
const wordDatabasePath = path.resolve(__dirname, '../data/words.txt')
const rankingPath = path.resolve(__dirname, '../data/ranking.json')
const dictionary = require('../utils/dictionary')
const stats = require('../utils/stats')

function getStats() {
    let queryNumber = '0'
    let playerCount = 0

    try {
        const rankingData = require(rankingPath)
        for (const serverId in rankingData) {
            if (rankingData.hasOwnProperty(serverId)) {
                const sv = rankingData[serverId]
                if (sv.players && Array.isArray(sv.players)) {
                    playerCount += sv.players.length
                }
            }
        }
    } catch (err) {
        console.error(`Error reading file ${rankingPath}:`, err)
    }

    try {
        // Đọc file query.txt và cập nhật queryNumber
        const queryData = fs.readFileSync(queryPath, 'utf-8')
        queryNumber = queryData;
    } catch (err) {
        console.error(`Error reading file ${queryPath}:`, err)
    }

    return { queryNumber, playerCount }
}

const statEmbed = (client) => {
    const { queryNumber, playerCount } = getStats()

    return new EmbedBuilder()
    .setColor(13250094)
    .addFields(
        {
            name: 'Tổng số server đang sử dụng',
            value: `${client.guilds.cache.size} servers`,
            inline: true
        },
        {
            name: 'Tổng số người đã chơi',
            value: `${playerCount}`,
            inline: true
        },
        {
            name: 'Tổng số từ đã nối',
            value: `${stats.getWordPlayedCount()}`,
            inline: true
        },
        {
            name: 'Tổng số vòng đã diễn ra',
            value: `${stats.getRoundPlayedCount()}`,
            inline: true
        },
        {
            name: 'Tổng số truy vấn dữ liệu',
            value: `${queryNumber}`,
            inline: true
        },
        {
            name: 'Tổng số từ trong ngân hàng từ',
            value: `${dictionary.countWordInDictionary()}`,
            inline: true
        },
    )
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Xem các thống kê của BOT'),

        async execute(interaction, client) {
            await interaction.reply({
                embeds: [statEmbed(client)],
                flags: [4096]
            })
        }
}