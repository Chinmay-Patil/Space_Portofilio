import { Html, Text } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

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
    title: useRef<THREE.Group>(null),
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
    const formElements = [
      inputRefs.email.current,
      inputRefs.name.current,
      inputRefs.message.current,
      inputRefs.submit.current,
    ];

    // Check if all refs are available
    if (formElements.some((el) => !el) || !inputRefs.title.current) return;

    // Set initial states for form elements
    formElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        gsap.set(element, {
          opacity: 0,
          y: 20,
        });
      }
    });

    // Set initial state for title
    //@ts-ignore
    gsap.set(inputRefs.title.current.material, {
      opacity: 0,
    });

    // Create and start animation timeline
    const tl = gsap.timeline({
      delay: 2,
    });

    // Animate title
    //@ts-ignore
    tl.to(inputRefs.title.current.material, {
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut',
    });

    // Animate form elements
    tl.to(
      formElements,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      },
      '-=0.5',
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <Text
        position={[150, 90, -150]}
        anchorX="center"
        anchorY="middle"
        font="./fonts/SpaceMono-Regular.ttf"
        fontSize={6}
        ref={inputRefs.title}
      >
        Contact Me
      </Text>
      <Html transform position={[150, 30, -150]} center scale={9.5}>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '600px',
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
