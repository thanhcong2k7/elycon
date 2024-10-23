const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

const helpEmbed = () => new EmbedBuilder()
    .setColor(13250094)
    .setDescription(':crystal_ball: Hướng dẫn sử dụng')
    .addFields(
        {
            name: 'Chọn kênh chơi nối từ',
            value: 'Dùng lệnh `/set-channel <channel>` trong kênh nối từ.',
            inline: true
        },
        {
            name: 'Bắt đầu lượt chơi mới',
            value: 'Dùng lệnh `!start` trong kênh chơi nối từ',
            inline: true
        },
        {
            name: 'Dừng lượt chơi hiện tại',
            value: 'Dùng lệnh `!stop` trong kênh chơi nối từ, lượt mới sẽ tự động bắt đầu!',
            inline: true
        },
        {
            name: 'Xem thống kê',
            value: 'Dùng lệnh `/stats`',
            inline: true
        },
        {
            name: 'Xem bảng xếp hạng trong server',
            value: 'Dùng lệnh `/rank`',
            inline: true
        },
        {
            name: 'Xem thống kê cá nhân',
            value: 'Dùng lệnh `/me`',
            inline: true
        },
        {
            name: 'Báo cáo từ sai trong từ điển',
            value: 'Dùng lệnh `/report <từ> [lý do]`',
            inline: true
        },
        {
            name: 'Xem thông tin server',
            value: 'Dùng lệnh `/server`',
            inline: true
        },
        {
            name: 'Ai có thể dùng lệnh set-channel?',
            value: 'Người dùng có quyền **MANAGE_GUILD**',
            inline: true
        },
        {
            name: 'Ai có thể dùng lệnh !start',
            value: 'Người dùng có quyền xem và gửi tin nhắn vào kênh nối từ',
            inline: true
        },
        {
            name: 'Ai có thể dùng lệnh !stop',
            value: 'Người dùng có quyền **MANAGE_CHANNEL** trong kênh nối từ',
            inline: true
        },
        {
            name: 'Khi nào trò chơi kết thúc?',
            value: 'Khi không còn từ nào trong từ điển có thể nối tiếp từ hiện tại hoặc dùng lệnh !stop',
            inline: true
        },
        {
            name: ':information_source: Mã nguồn bot',
            value: '[github.com/lvdat/bot-noi-tu](https://github.com/lvdat/bot-noi-tu)',
            inline: true
        },

    )

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Xem hướng dẫn sử dụng bot'),
    async execute(interaction) {
        await interaction.reply({
            embeds: [helpEmbed()],
            flags: [4096]
        })
    }
}