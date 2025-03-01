import { Html } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const inputRefs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
    submit: useRef<HTMLButtonElement>(null),
    title: useRef<HTMLHeadingElement>(null),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if form fields are filled
      if (!formData.name || !formData.email || !formData.message) {
        toast.error('Please fill all fields');
        return;
      }

      if (formRef.current) {
        const result = await emailjs.sendForm(
          'service_0u4xghm',
          'template_cqzypac',
          formRef.current,
          'uxo9vdiph3VYVZobs',
        );

        if (result.text === 'OK') {
          toast.success('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        }
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkRefs = () => {
      const elements = [formRef.current, inputRefs.title.current];

      if (!elements.some((el) => !el)) {
        setIsReady(true);
      }
    };

    // Check refs every 100ms until they're all ready
    const interval = setInterval(checkRefs, 100);

    return () => clearInterval(interval);
  }, []);

  // Handle animations once refs are ready
  useEffect(() => {
    if (!isReady) return;

    gsap.set([formRef.current, inputRefs.title.current], {
      opacity: 0,
    });

    // Create and start animation timeline
    const tl = gsap.timeline({
      delay: 1,
    });

    tl.to([formRef.current, inputRefs.title.current], {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    });

    return () => {
      tl.kill();
    };
  }, [isReady]);

  return (
    <>
      <Html transform position={[150, 30, -150]} center scale={9.5}>
        <h1 ref={inputRefs.title}>
          <span
            style={{
              color: 'white',
              fontSize: '30px',
              font: './fonts/SpaceMono-Regular.ttf',
              marginLeft: '35%',
            }}
          >
            Get in touch
          </span>
          <br />
        </h1>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '600px',
            opacity: 0,
          }}
        >
          <input
            type="text"
            name="from_name" // Updated to match template
            placeholder="Name"
            value={formData.name}
            ref={inputRefs.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{
              padding: '15px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '18px',
              backdropFilter: 'blur(10px)',
            }}
          />
          <input
            type="email"
            placeholder="Email"
            name="to_name" // Updated to match template
            value={formData.email}
            ref={inputRefs.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            style={{
              padding: '15px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '18px',
              backdropFilter: 'blur(10px)',
            }}
          />
          <textarea
            placeholder="Message"
            name="message" //
            value={formData.message}
            ref={inputRefs.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            style={{
              padding: '15px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '18px',
              height: '150px',
              resize: 'none',
              backdropFilter: 'blur(10px)',
            }}
          />
          <button
            type="submit"
            ref={inputRefs.submit}
            style={{
              padding: '15px 30px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '18px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              width: '300px',
              marginLeft: '30%',
              marginTop: '2%',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </Html>
    </>
  );
}
