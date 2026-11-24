import React from 'react';
import FloatingHealthChatbot from './dashboard/FloatingHealthChatbot';

// Reusing the original, genuine FloatingHealthChatbot component in inline/spacious mode.
// This eliminates duplicate components, prevents mock simulations, and preserves 100% of the live AI logic.
export default function ChatAssistantSection({ onStartAssessment, user }) {
  return (
    <FloatingHealthChatbot
      inline={true}
      user={user}
      onStartAssessment={onStartAssessment}
    />
  );
}
