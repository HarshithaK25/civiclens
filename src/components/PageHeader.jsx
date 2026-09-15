export default function PageHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div className="page-header">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <div className="page-header-row">
        <div>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {action && <div className="page-header-action">{action}</div>}
      </div>
    </div>
  );
}
