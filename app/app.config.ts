export default defineAppConfig({
  ui: {
    primary: 'blue',
    gray: 'zinc',
  },
  seo: {
    siteName: 'Cub\'IA',
    tagLine: 'L\'IA souveraine dans votre entreprise',
  },
  header: {
    colorMode: true,
  },
  footer: {
    newsletter: {
      label: 'S\'abonner à la newsletter',
      button: 'S\'abonner',
      notification: {
        title: 'Merci pour l\'abonnement !',
      },
    },
    links: [
      {
        label: 'Formations',
        children: [
          // Update query
          { label: 'Découvrir', to: '/formations' },
          { label: 'Approfondir', to: '/formations' },
          { label: 'Pratiquer', to: '/formations' },
        ],
      },
      {
        label: 'Services',
        children: [
          { label: 'Cub\'IA Pro', to: '/services' },
          { label: 'Cub\'IA Entreprise', to: '/services' },
        ],
      },
      {
        label: 'Entreprise',
        children: [
          { label: 'À propos', to: 'https://example.com', target: '_blank' },
          { label: 'Blog', to: '/blog' },
          { label: 'Contact', to: '/contact' },
        ],
      },
      {
        label: 'Clients',
        children: [
          { label: 'Centre d\'aide', to: 'https://example.com', target: '_blank' },
          { label: 'Cas clients', to: 'https://example.com', target: '_blank' },
          { label: 'FAQ', to: '/faq' },
        ],
      },
    ],
  },
  socials: [
    {
      icon: 'i-simple-icons-x',
      to: 'https://x.com/soubiran_',
      target: '_blank',
    },
    {
      icon: 'i-simple-icons-linkedin',
      to: 'https://www.linkedin.com/in/esteban25/',
      target: '_blank',
    },
  ],
  toc: {
    title: 'Table des matières',
    bottom: {
      title: 'Ressources',
    },
  },
})
