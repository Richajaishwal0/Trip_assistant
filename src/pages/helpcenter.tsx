import React from 'react';

const HelpCentre: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        background:
          'linear-gradient(rgba(48,58,75,0.90), rgba(72,120,153,0.78)), url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80") no-repeat center center fixed',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowX: 'hidden',
      }}
    >
      <main
        style={{
          marginTop: 96,
          marginBottom: 48,
          width: '95%',
          maxWidth: 700,
          borderRadius: 24,
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.16)',
          padding: 40,
          background: 'rgba(255, 255, 255, 0.20)',
          border: '1px solid rgba(255, 255, 255, 0.36)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)', // for Safari support
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#252c41',
          userSelect: 'none',
        }}
      >
        <h1
          style={{
            fontSize: '2.7rem',
            marginBottom: 16,
            fontWeight: 700,
            userSelect: 'text',
          }}
        >
          Help Center
        </h1>
        <p
          style={{
            marginTop: 0,
            marginBottom: 16,
            fontSize: 18,
            color: '#2a3851',
            userSelect: 'text',
          }}
        >
          Find answers to your questions or contact support
        </p>
        <input
          type="text"
          placeholder="Search FAQs"
          style={{
            width: '100%',
            maxWidth: 400,
            padding: '14px 18px',
            borderRadius: 20,
            border: '1.5px solid #c3cad9',
            fontSize: 17,
            marginBottom: 32,
            outline: 'none',
            boxShadow: '0 2px 8px rgba(72,120,153,0.05)',
            userSelect: 'text',
            transition: 'border-color 0.3s',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = '#ffd700')}
          onBlur={e => (e.currentTarget.style.borderColor = '#c3cad9')}
        />
        <section style={{ width: '100%' }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 600,
              marginBottom: 12,
              marginTop: 0,
              textAlign: 'left',
              userSelect: 'text',
            }}
          >
            Contact Support
          </h2>
          <p style={{ marginBottom: 14, color: '#2a3851', userSelect: 'text' }}>
            Need help with a specific issue? Contact our support team for assistance.
          </p>
          <button
            style={{
              padding: '13px 32px',
              background: 'linear-gradient(90deg, #ffd700 0%, #e4ae20 100%)',
              color: '#252c41',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '30px',
              boxShadow: '0 3px 12px 0 rgba(0,0,0,0.13)',
              cursor: 'pointer',
              marginBottom: 34,
              transition: 'background 0.3s, color 0.3s',
              userSelect: 'none',
            }}
            onMouseOver={e => {
              (e.currentTarget as HTMLButtonElement).style.background =
                'linear-gradient(90deg, #e4ae20 0%, #ffd700 100%)';
              (e.currentTarget as HTMLButtonElement).style.color = '#fff';
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLButtonElement).style.background =
                'linear-gradient(90deg, #ffd700 0%, #e4ae20 100%)';
              (e.currentTarget as HTMLButtonElement).style.color = '#252c41';
            }}
          >
            Contact Support
          </button>

          <h2
            style={{
              fontSize: 22,
              fontWeight: 600,
              margin: '16px 0 18px 0',
              textAlign: 'left',
              userSelect: 'text',
            }}
          >
            Common Help Topics
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 22,
            }}
          >
            <HelpTopic
              icon="🗺️"
              title="Planning a Trip"
              desc="Learn how to create and customize your travel plans"
            />
            <HelpTopic
              icon="📆"
              title="Managing Your Bookings"
              desc="View, modify, or cancel your existing reservations"
            />
            <HelpTopic
              icon="💳"
              title="Payment and Refunds"
              desc="Manage your payment methods and understand refund policies"
            />
            <HelpTopic
              icon="👤"
              title="Account Settings"
              desc="Update your profile information and preferences"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

const HelpTopic: React.FC<{ icon: string; title: string; desc: string }> = ({
  icon,
  title,
  desc,
}) => (
  <div
    style={{
      flex: '1 0 220px',
      minWidth: 220,
      background: 'rgba(244, 248, 250, 0.8)', // slight translucency
      borderRadius: 14,
      padding: '20px 18px',
      boxShadow: '0 2px 10px rgba(48,58,75,0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      userSelect: 'text',
      transition: 'transform 0.25s',
      cursor: 'default',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)';
      (e.currentTarget as HTMLDivElement).style.boxShadow =
        '0 6px 20px rgba(48, 58, 75, 0.2)';
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
      (e.currentTarget as HTMLDivElement).style.boxShadow =
        '0 2px 10px rgba(48,58,75,0.1)';
    }}
  >
    <span style={{ fontSize: 32, marginBottom: 10 }}>{icon}</span>
    <span
      style={{
        fontWeight: 700,
        fontSize: 18,
        color: '#252c41',
        marginBottom: 5,
      }}
    >
      {title}
    </span>
    <span style={{ color: '#485879', fontSize: 15 }}>{desc}</span>
  </div>
);
   
export default HelpCentre;
