exports.up = (pgm) => {
  pgm.createTable('products', {
    id: { type: 'serial', primaryKey: true },
    name: { type: 'varchar(255)', notNull: true },
    description: { type: 'text' },
    price: { type: 'decimal(10, 2)', notNull: true },
    imageUrl: { type: 'varchar(255)' },
    category: { type: 'varchar(100)' },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('products');
};
