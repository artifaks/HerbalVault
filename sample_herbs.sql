-- Insert sample herbs
INSERT INTO herbs (common_name, scientific_name, description, traditional_uses, modern_uses, safety_precautions, images) VALUES
(
    'Echinacea',
    'Echinacea purpurea',
    'Echinacea is a flowering plant widely used in traditional medicine. Native to North America, it has been used for centuries by Native Americans for its medicinal properties.',
    ARRAY['Immune system support', 'Cold and flu treatment', 'Wound healing'],
    ARRAY['Upper respiratory infections', 'Immune system stimulation', 'Anti-inflammatory'],
    ARRAY['Avoid if allergic to plants in the daisy family', 'Not recommended for autoimmune conditions', 'May interact with immunosuppressant drugs'],
    '{"fresh": "https://images.unsplash.com/photo-1530126483408-aa533e55bdb2", "dried": "https://images.unsplash.com/photo-1532771014784-b24713ddc9c1"}'
),
(
    'Chamomile',
    'Matricaria chamomilla',
    'Chamomile is one of the oldest known medicinal herbs, featuring a daisy-like appearance and a gentle, apple-like fragrance. It has been used for thousands of years for its calming and anti-inflammatory properties.',
    ARRAY['Sleep aid', 'Digestive support', 'Anxiety relief', 'Skin conditions'],
    ARRAY['Insomnia treatment', 'Gastrointestinal disorders', 'Anti-anxiety supplement'],
    ARRAY['May cause allergic reactions in some individuals', 'Avoid if allergic to plants in the daisy family', 'May interact with blood thinning medications'],
    '{"fresh": "https://images.unsplash.com/photo-1587593810167-a84920ea0781", "dried": "https://images.unsplash.com/photo-1573848891625-9abbc74f5e25"}'
),
(
    'Turmeric',
    'Curcuma longa',
    'Turmeric is a flowering plant of the ginger family, commonly used as a spice and medicinal herb. Its bright yellow color comes from curcumin, which has powerful anti-inflammatory properties.',
    ARRAY['Joint pain relief', 'Digestive aid', 'Anti-inflammatory', 'Wound healing'],
    ARRAY['Arthritis treatment', 'Anti-inflammatory supplement', 'Antioxidant support'],
    ARRAY['May interact with blood thinners', 'Can cause stomach upset in high doses', 'May lower blood sugar'],
    '{"fresh": "https://images.unsplash.com/photo-1615485500704-8e990f9e6ec4", "dried": "https://images.unsplash.com/photo-1615485291234-9d694160b50d"}'
),
(
    'Lavender',
    'Lavandula angustifolia',
    'Lavender is an aromatic herb known for its distinctive purple flowers and sweet floral scent. It has been used for centuries in traditional medicine and aromatherapy.',
    ARRAY['Sleep improvement', 'Anxiety relief', 'Headache treatment', 'Skin care'],
    ARRAY['Aromatherapy', 'Sleep aid', 'Anxiety treatment'],
    ARRAY['May cause skin irritation in some people', 'Can increase drowsiness', 'Not recommended during pregnancy'],
    '{"fresh": "https://images.unsplash.com/photo-1587467512961-120760940315", "dried": "https://images.unsplash.com/photo-1595159814851-675a4cd22e36"}'
),
(
    'Ginger',
    'Zingiber officinale',
    'Ginger is a flowering plant whose rhizome is widely used as a spice and folk medicine. It has been used for thousands of years for both culinary and medicinal purposes.',
    ARRAY['Nausea relief', 'Digestive aid', 'Anti-inflammatory', 'Cold and flu treatment'],
    ARRAY['Motion sickness prevention', 'Morning sickness relief', 'Anti-inflammatory supplement'],
    ARRAY['May interact with blood thinners', 'Can cause heartburn in high doses', 'May lower blood sugar'],
    '{"fresh": "https://images.unsplash.com/photo-1615485290441-685dbf11f797", "dried": "https://images.unsplash.com/photo-1615485291234-9d694160b50d"}'
),
(
    'Peppermint',
    'Mentha × piperita',
    'Peppermint is a hybrid mint, a cross between watermint and spearmint. It is known for its cooling properties and high menthol content.',
    ARRAY['Digestive aid', 'Headache relief', 'Fresh breath', 'Cold symptoms'],
    ARRAY['IBS treatment', 'Tension headache relief', 'Aromatherapy'],
    ARRAY['May worsen acid reflux', 'Can interact with certain medications', 'Not recommended for infants'],
    '{"fresh": "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1", "dried": "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1"}'
),
(
    'St. John''s Wort',
    'Hypericum perforatum',
    'St. John''s Wort is a flowering plant with yellow flowers. It has been used traditionally for mental health conditions and wound healing.',
    ARRAY['Mood enhancement', 'Wound healing', 'Nerve pain relief'],
    ARRAY['Depression treatment', 'Anxiety relief', 'Topical wound healing'],
    ARRAY['Interacts with many medications', 'Can cause photosensitivity', 'Not recommended during pregnancy'],
    '{"fresh": "https://images.unsplash.com/photo-1530126483408-aa533e55bdb2", "dried": "https://images.unsplash.com/photo-1532771014784-b24713ddc9c1"}'
),
(
    'Valerian',
    'Valeriana officinalis',
    'Valerian is a perennial flowering plant native to Europe and Asia. Its root is commonly used for sleep and anxiety disorders.',
    ARRAY['Sleep aid', 'Anxiety relief', 'Stress reduction'],
    ARRAY['Insomnia treatment', 'Anxiety management', 'Sleep quality improvement'],
    ARRAY['Can cause drowsiness', 'May interact with sedative medications', 'Not recommended for long-term use'],
    '{"fresh": "https://images.unsplash.com/photo-1530126483408-aa533e55bdb2", "dried": "https://images.unsplash.com/photo-1532771014784-b24713ddc9c1"}'
);
