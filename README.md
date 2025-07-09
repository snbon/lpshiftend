# ShiftEnd Landing Page

A clean, responsive landing page for ShiftEnd - the digital daily revenue log for Belgian restaurant owners.

## 🚀 Features

- **Multi-language Support**: Dutch, English, and French
- **Animated Components**: Smooth animations using Framer Motion
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Modern UI**: Clean design with Tailwind CSS
- **Interactive Elements**: Email modal, language switcher, collapsible sections

## 🛠 Tech Stack

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Internationalization**: react-i18next
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/
│   ├── AnimatedComponents.tsx    # Reusable animated components
│   ├── EmailModal.tsx           # Email collection modal
│   ├── LanguageSwitcher.tsx     # Language switcher component
│   └── LandingPage.tsx          # Main landing page component
├── i18n.ts                      # Internationalization configuration
├── App.tsx                      # Main app component
└── index.css                    # Global styles with Tailwind
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Deep Purple (#5A189A)
- **Secondary**: Purple variants for gradients
- **Neutral**: Gray scale for text and backgrounds

### Sections
1. **Hero Section**: Main value proposition with CTA
2. **Problem Section**: Pain points with paper logs and Excel
3. **Features Grid**: Benefits with hover animations
4. **Legal Compliance**: Collapsible accordion
5. **Pricing**: Simple €9/month pricing
6. **FOD Validation**: Trust indicator
7. **CTA Section**: Email collection
8. **Footer**: Links and language switcher

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm start
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🌐 Language Support

The landing page supports three languages:
- **Dutch (NL)**: Primary language
- **English (EN)**: International audience
- **French (FR)**: Belgian French-speaking regions

Language switching is available via the dropdown in the header and footer.

## 📱 Responsive Design

The landing page is fully responsive and optimized for:
- **Mobile**: Single column layout
- **Tablet**: Two-column grid for features
- **Desktop**: Full multi-column layout

## 🎭 Animations

Built with Framer Motion for smooth, performant animations:
- **FadeIn**: Section transitions
- **CardReveal**: Feature cards
- **SlideIn**: Content reveals
- **HoverCard**: Interactive elements
- **StaggeredGrid**: Feature grid animations

## 📧 Email Collection

The email modal includes:
- Form validation
- Loading states
- Success animation
- Multi-language support

## 🔧 Customization

### Adding New Languages
1. Add translations to `src/i18n.ts`
2. Update the language switcher in `LanguageSwitcher.tsx`

### Modifying Colors
Update the Tailwind config in `tailwind.config.js`:
```javascript
colors: {
  purple: {
    600: '#5A189A', // Primary color
    700: '#4C1D95',
    800: '#3B185F',
  }
}
```

### Adding New Sections
1. Create new components in `src/components/`
2. Import animated components from `AnimatedComponents.tsx`
3. Add to `LandingPage.tsx`

## 📄 License

Made in Belgium for Belgian hospitality.

---

**ShiftEnd**: Het digitale dagontvangstenboek - Wettelijk correct. Supersimpel. Zonder GKS.
