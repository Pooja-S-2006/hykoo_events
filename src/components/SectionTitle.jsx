const SectionTitle = ({ title, subtitle, children, light = false }) => {
  return (
    <div className="text-center mb-12">
      <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
        light ? 'text-white' : 'text-primary'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl mx-auto ${
          light ? 'text-white/80' : 'text-muted-foreground'
        }`}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
};

export default SectionTitle;
