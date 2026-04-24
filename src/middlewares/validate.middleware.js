export const validate = (schemaOrFactory, property = 'body') => {
  return (req, res, next) => {
    // If factory function, call it with req to get the schema dynamically
    const schema =
      typeof schemaOrFactory === 'function'
        ? schemaOrFactory(req)
        : schemaOrFactory;

    const { error } = schema.validate(req[property], {
      abortEarly: true,
      allowUnknown: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((d) => d.message.replace(/"/g, ''));

      return res.status(400).json({
        success: false,
        message: messages[0],
      });
    }

    next();
  };
};
