[README.md](https://github.com/user-attachments/files/28301610/README.md)
# 2026 FIFA World Cup Predictor - Fundraiser

A complete web-based World Cup prediction game designed for fundraising for local football clubs.

## 🎯 Overview

This is a fully functional World Cup predictor that allows participants to:
- Predict scores for all 48 group stage matches
- Select group winners
- Make bonus predictions (tournament winner, golden boot, total goals)
- Track their position on a live leaderboard
- Compete for prizes while supporting the local club

## 📁 Files Included

- **index.html** - Main predictor page (for participants)
- **admin.html** - Admin panel for managing results
- **styles.css** - All styling (mobile-responsive)
- **script.js** - Core functionality and scoring logic
- **README.md** - This file

## 🚀 How to Use

### For Participants:

1. **Open index.html** in any web browser
2. **Enter Details**: Fill in name, email, and phone
3. **Make Predictions**: 
   - Enter scores for each match (up to 48 group stage matches)
   - Select group winners
   - Add bonus predictions
4. **Submit**: Save predictions (can edit anytime before June 11, 2026)
5. **Track Progress**: Check the leaderboard to see standings

### For Organizers/Admins:

1. **Open admin.html** in a web browser
2. **Enter Match Results**: As matches are played, enter the actual scores
3. **Monitor Stats**: See total participants, funds raised, matches played
4. **Export Data**: 
   - Download participant list for contact/payment tracking
   - Export all data for backup
5. **Manage**: Clear or update results as needed

## 💰 Fundraising Details

Based on the guidelines in your text file:

- **Entry Fee**: £10 per participant
- **Prize Distribution**: 
  - 60% goes to prize pot
  - 40% goes to the club
- **Prize Structure**:
  - 1st Place: 40% of prize pot
  - 2nd Place: 25% of prize pot
  - 3rd Place: 15% of prize pot
  - Weekly Best: £20 each match week

### Example:
- 150 participants = £1,500 raised
- Prize pot: £900
- Club funds: £600

## 📊 Scoring System

### Match Predictions (40 points max per match):
- Correct home score: **5 points**
- Correct away score: **5 points**
- Correct result (win/draw/loss): **10 points**
- Perfect prediction bonus: **20 points**

### Example:
If the actual result is Mexico 2-1 South Africa and you predicted Mexico 2-1 South Africa:
- Correct home score (2): 5 points
- Correct away score (1): 5 points
- Correct result (Mexico win): 10 points
- Perfect prediction: 20 points
- **Total: 40 points**

### Bonus Predictions:
- Tournament winner: **10 points**
- Golden Boot winner: **10 points**
- Total goals (exact): **10 points**

## 🌐 Hosting Options

### Option 1: Local/Offline Use
- Simply open index.html in a browser
- Works entirely offline
- Data stored in browser's localStorage
- Perfect for small groups

### Option 2: Online Hosting (Recommended)
Host on free platforms like:
- **GitHub Pages**: Free, easy, reliable
- **Netlify**: Free tier, automatic deployments
- **Vercel**: Free for personal projects

#### To host on GitHub Pages:
1. Create a GitHub account (free)
2. Create a new repository
3. Upload all files (index.html, admin.html, styles.css, script.js)
4. Enable GitHub Pages in repository settings
5. Share the link with participants!

### Option 3: Google Drive (Simple)
1. Upload all files to Google Drive
2. Share the folder with "Anyone with the link"
3. Participants can download and open locally

## 📱 Mobile-Friendly

The predictor is fully responsive and works great on:
- Desktop computers
- Tablets
- Smartphones

All styling adapts automatically to screen size.

## 🔐 Data Storage

- All data is stored in the browser's **localStorage**
- No server required
- Data persists between sessions
- Can be exported/imported for backup

### Important Notes:
1. **Backup Regularly**: Use the admin panel to export data
2. **Browser-Specific**: Data is tied to the browser used
3. **Clear Cache Warning**: Don't clear browser data or localStorage will be lost
4. **Multiple Devices**: Each device stores its own data

## 📋 Payment Tracking

The system tracks who has entered but **does not process payments**. You'll need to:

1. Use the admin panel to download the participant list
2. Track payments separately (bank transfer, cash, etc.)
3. Only count valid predictions once payment is confirmed

### Recommended Process:
1. Participants submit predictions online
2. Download participant list from admin panel
3. Send payment reminders via email/WhatsApp
4. Mark paid participants on your tracking sheet
5. Only paid participants eligible for prizes

## 🎨 Customization

### To customize for your club:

1. **Edit index.html**:
   - Change club name in header
   - Update footer text
   - Modify entry fee amount

2. **Edit styles.css**:
   - Change color scheme (search for #667eea and #764ba2)
   - Adjust sizing for different screens
   - Add club logo

3. **Edit script.js**:
   - Modify scoring rules if needed
   - Change prize structure

## 📊 Marketing Tips (from your guidelines)

### Promotion Ideas:
- Share on WhatsApp club groups
- Post on Facebook and Instagram
- Send email newsletters
- Announce at matchdays
- Share in parent groups
- Display posters at club

### Key Messages:
- "Support your club and test your football knowledge!"
- "£10 entry - win prizes and help our young players"
- "Easy to enter - predict scores and track your position"
- "World Cup only happens every 4 years - don't miss out!"

### Create Urgency:
- Launch early (before tournament)
- Offer early bird prizes
- Show live signup numbers
- Create team competitions

## 🔧 Troubleshooting

### Problem: Data disappeared
- **Solution**: Check if browser cache was cleared. Always keep backups using admin export function.

### Problem: Can't access admin page
- **Solution**: Navigate to admin.html directly or click link in footer of main page.

### Problem: Scores not updating
- **Solution**: Refresh the page. Click "Refresh Leaderboard" in admin panel.

### Problem: Need to move to different computer
- **Solution**: Export data from admin panel, move files and import on new computer.

## 📞 Support

For questions about using this predictor:
1. Check this README file
2. Review the "Rules & Scoring" section on the main page
3. Test with sample data using admin panel

## ⚖️ Legal Considerations

Per your guidelines, make sure to:
- Check local fundraising regulations
- Ensure compliance with gaming laws in your jurisdiction
- Keep clear records of all entries and payments
- Be transparent about prize distribution

## 🎉 Best Practices

1. **Launch Early**: Give people time to enter before tournament starts
2. **Promote Consistently**: Regular reminders increase participation
3. **Show Progress**: Share signup numbers to create momentum
4. **Keep It Fun**: Focus on community and club support
5. **Communicate**: Send updates after key matches
6. **Celebrate Winners**: Announce winners promptly and publicly

## 📈 Tracking Success

Use the admin panel statistics to monitor:
- Total participants
- Funds raised
- Matches completed
- Current leader

Share these stats regularly to maintain interest!

## 🏆 Tournament Schedule

**2026 FIFA World Cup Dates:**
- **Start**: June 11, 2026 (Opening match: Mexico vs South Africa)
- **End**: July 19, 2026 (Final at MetLife Stadium, New Jersey)
- **Groups**: 12 groups (A-L) with 4 teams each
- **Format**: Top 2 from each group + 8 best 3rd place teams advance

## 📝 Quick Start Checklist

- [ ] Review all files
- [ ] Test locally by opening index.html
- [ ] Customize with your club details
- [ ] Decide on hosting method
- [ ] Set up payment tracking system
- [ ] Create promotional materials
- [ ] Launch and promote!
- [ ] Regular backups from admin panel
- [ ] Enter results as matches are played
- [ ] Update participants with leaderboard

## 🎯 Good Luck!

This predictor is designed to be simple, fun, and effective for fundraising. The 2026 World Cup is a fantastic opportunity to engage your community and raise funds for your club.

**Remember**: The key to success is early promotion, consistent communication, and keeping it fun and simple!

---

*Based on the fundraising guidelines from your "How to Run a World Cup Predictor" document and official 2026 FIFA World Cup group stage data.*
