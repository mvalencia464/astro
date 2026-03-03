# Astro 6 Conversion Templates - Quick Reference

Use these templates as starting points when converting your React components.

---

## Template 1: Simple Rotating Content (TestimonialRotator Pattern)

### React Version
```tsx
import React, { useState, useEffect } from 'react';

const RotatingComponent = () => {
  const items = ["Item 1", "Item 2", "Item 3"];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % items.length);
        setVisible(true);
      }, 500);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`transition-opacity ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {items[index]}
    </div>
  );
};

export default RotatingComponent;
```

### Astro Version
```astro
---
const items = ["Item 1", "Item 2", "Item 3"];
---

<div id="rotator" class="transition-opacity opacity-100">
  {items[0]}
</div>

<script define:vars={{ items }}>
  const rotator = document.getElementById('rotator');
  let currentIndex = 0;

  setInterval(() => {
    rotator.classList.remove('opacity-100');
    rotator.classList.add('opacity-0');
    
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % items.length;
      rotator.textContent = items[currentIndex];
      rotator.classList.remove('opacity-0');
      rotator.classList.add('opacity-100');
    }, 500);
  }, 5000);
</script>
```

---

## Template 2: Image Carousel with Touch (TestimonialImageCarousel Pattern)

### React Version
```tsx
import React, { useState, useRef } from 'react';

const ImageCarousel = ({ images, title }) => {
  const [index, setIndex] = useState(0);
  const [touch, setTouch] = useState({ start: 0, end: 0 });

  const handleTouchStart = (e) => {
    setTouch({ ...touch, start: e.touches[0].clientX });
  };

  const handleTouchEnd = (e) => {
    const end = e.changedTouches[0].clientX;
    const distance = touch.start - end;
    
    if (distance > 50) {
      setIndex((prev) => (prev + 1) % images.length);
    } else if (distance < -50) {
      setIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <img src={images[index]} alt={title} />
      <div>{index + 1} / {images.length}</div>
      <button onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}>
        Previous
      </button>
      <button onClick={() => setIndex((prev) => (prev + 1) % images.length)}>
        Next
      </button>
    </div>
  );
};
```

### Astro Version
```astro
---
interface Props {
  images: string[];
  title: string;
}

const { images, title } = Astro.props;
---

<div id="carousel" class="relative">
  <img id="carousel-img" src={images[0]} alt={title} />
  <div id="counter">{`1 / ${images.length}`}</div>
  <button id="prev" aria-label="Previous">❮</button>
  <button id="next" aria-label="Next">❯</button>
</div>

<script define:vars={{ images, title }}>
  class Carousel {
    constructor(images, title) {
      this.images = images;
      this.title = title;
      this.index = 0;
      this.touchStart = 0;
      this.touchEnd = 0;
      this.img = document.getElementById('carousel-img');
      this.counter = document.getElementById('counter');
      
      this.init();
    }

    init() {
      const carousel = document.getElementById('carousel');
      
      carousel.addEventListener('touchstart', (e) => {
        this.touchStart = e.touches[0].clientX;
      });
      
      carousel.addEventListener('touchend', (e) => {
        this.touchEnd = e.changedTouches[0].clientX;
        this.handleSwipe();
      });
      
      document.getElementById('prev').addEventListener('click', () => this.prev());
      document.getElementById('next').addEventListener('click', () => this.next());
    }

    handleSwipe() {
      const distance = this.touchStart - this.touchEnd;
      if (distance > 50) this.next();
      if (distance < -50) this.prev();
    }

    prev() {
      this.index = (this.index - 1 + this.images.length) % this.images.length;
      this.update();
    }

    next() {
      this.index = (this.index + 1) % this.images.length;
      this.update();
    }

    update() {
      this.img.src = this.images[this.index];
      this.img.alt = `${this.title} image ${this.index + 1}`;
      this.counter.textContent = `${this.index + 1} / ${this.images.length}`;
    }
  }

  new Carousel(images, title);
</script>
```

---

## Template 3: Form with Validation

### React Version
```tsx
import React, { useState } from 'react';

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email || !email.includes('@')) newErrors.email = 'Valid email required';
    if (!message || message.length < 10) newErrors.message = 'Min 10 characters';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      // Submit to server
    } else {
      setErrors(newErrors);
    }
  };

  if (submitted) return <div>Thank you!</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {errors.email && <span className="error">{errors.email}</span>}
      
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      />
      {errors.message && <span className="error">{errors.message}</span>}
      
      <button type="submit">Send</button>
    </form>
  );
};
```

### Astro Version
```astro
---
// Server-side validation (optional, add to your Astro route)
interface Props {
  onSubmit?: (data: FormData) => Promise<void>;
}

const { onSubmit } = Astro.props;
---

<form id="contact-form" class="space-y-4">
  <div>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="Email"
      required
      class="w-full px-4 py-2 border rounded"
    />
    <span id="email-error" class="text-red-500 text-sm hidden"></span>
  </div>

  <div>
    <textarea
      id="message"
      name="message"
      placeholder="Message"
      required
      class="w-full px-4 py-2 border rounded"
    ></textarea>
    <span id="message-error" class="text-red-500 text-sm hidden"></span>
  </div>

  <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
    Send
  </button>

  <div id="success-message" class="hidden text-green-600">
    Thank you! Your message has been sent.
  </div>
</form>

<script>
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('success-message');

  const validate = () => {
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const errors = {};

    if (!email || !email.includes('@')) {
      errors.email = 'Valid email required';
    }
    if (!message || message.length < 10) {
      errors.message = 'Min 10 characters';
    }

    return errors;
  };

  const showErrors = (errors) => {
    // Clear previous errors
    document.querySelectorAll('[id$="-error"]').forEach(el => {
      el.textContent = '';
      el.classList.add('hidden');
    });

    // Show new errors
    Object.entries(errors).forEach(([field, message]) => {
      const errorEl = document.getElementById(`${field}-error`);
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
      }
    });
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      showErrors(errors);
      return;
    }

    // Submit to server
    const formData = new FormData(form);
    try {
      const response = await fetch(form.action || location.pathname, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        form.reset();
        successMsg.classList.remove('hidden');
        setTimeout(() => {
          successMsg.classList.add('hidden');
        }, 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  });
</script>

<style>
  input, textarea {
    display: block;
    width: 100%;
  }

  .error {
    color: rgb(239, 68, 68);
    font-size: 0.875rem;
  }
</style>
```

---

## Template 4: Modal with Native Dialog

### React Version
```tsx
import React, { useState } from 'react';

const Modal = ({ title, children, onClose, onSubmit }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    onSubmit?.();
    setOpen(false);
  };

  if (!open) {
    return <button onClick={() => setOpen(true)}>Open Modal</button>;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setOpen(false)} />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg max-w-md">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          {children}
          <div className="flex gap-3 mt-6">
            <button onClick={() => setOpen(false)} className="flex-1 border rounded px-4 py-2">
              Cancel
            </button>
            <button onClick={handleSubmit} className="flex-1 bg-blue-600 text-white rounded px-4 py-2">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
```

### Astro Version
```astro
---
interface Props {
  title: string;
  id?: string;
}

const { title, id = "modal" } = Astro.props;
---

<button id="{id}-trigger" class="px-4 py-2 bg-blue-600 text-white rounded">
  Open Modal
</button>

<dialog id={id} class="rounded-lg max-w-md backdrop:bg-black/50">
  <form method="dialog" class="p-6">
    <h2 class="text-2xl font-bold mb-4">{title}</h2>
    
    <div id="{id}-content" class="mb-6">
      <slot />
    </div>
    
    <div class="flex gap-3">
      <button type="button" class="flex-1 border rounded px-4 py-2">Cancel</button>
      <button type="submit" class="flex-1 bg-blue-600 text-white rounded px-4 py-2">
        Submit
      </button>
    </div>
  </form>
</dialog>

<script define:vars={{ id }}>
  const dialog = document.getElementById(id);
  const trigger = document.getElementById(`${id}-trigger`);

  trigger.addEventListener('click', () => dialog.showModal());

  dialog.addEventListener('close', () => {
    console.log('Modal closed');
  });
</script>

<style>
  dialog {
    width: 90vw;
    max-width: 28rem;
  }

  dialog::backdrop {
    animation: fadeIn 200ms ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>
```

---

## Template 5: Tab Navigation

### React Version
```tsx
import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 ${i === activeTab ? 'border-b-2 border-blue-600' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">{tabs[activeTab].content}</div>
    </div>
  );
};
```

### Astro Version
```astro
---
interface Tab {
  label: string;
  content: string;
}

interface Props {
  tabs: Tab[];
}

const { tabs } = Astro.props;
---

<div class="tabs">
  <div class="flex border-b">
    {tabs.map((tab, i) => (
      <button
        class={`tab-button px-4 py-2 transition ${i === 0 ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
        data-index={i}
        type="button"
      >
        {tab.label}
      </button>
    ))}
  </div>

  <div class="tab-content p-4">
    {tabs.map((tab, i) => (
      <div id={`tab-${i}`} class={`tab-pane ${i === 0 ? '' : 'hidden'}`}>
        {tab.content}
      </div>
    ))}
  </div>
</div>

<script>
  const buttons = document.querySelectorAll('.tab-button');
  const panes = document.querySelectorAll('.tab-pane');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;

      // Remove active state from all
      buttons.forEach(b => {
        b.classList.remove('border-b-2', 'border-blue-600', 'text-blue-600');
      });
      panes.forEach(p => p.classList.add('hidden'));

      // Add active state to clicked
      btn.classList.add('border-b-2', 'border-blue-600', 'text-blue-600');
      document.getElementById(`tab-${index}`).classList.remove('hidden');
    });
  });
</script>
```

---

## Key Patterns

| Pattern | React | Astro |
|---------|-------|-------|
| **State** | `useState` | JS variable in `<script>` |
| **Side Effects** | `useEffect` | Direct event listeners |
| **DOM Updates** | Re-render | `classList.add/remove`, `textContent =`, `setAttribute` |
| **Props** | Function parameters | `Astro.props` |
| **Conditional** | `condition && <Element />` | Same, or `{condition ? x : y}` |
| **Lists** | `.map()` | `.map()` in template |
| **Animations** | CSS or libraries | Tailwind transitions or keyframes |
| **Modals** | Libraries | Native `<dialog>` element |
| **Forms** | Controlled inputs | Native form + `FormData` API |

---

## Performance Checklist

After converting:

```
□ Run Lighthouse audit (target 95+)
□ Check Network tab - no React bundles
□ Test on 3G network (DevTools)
□ Test touch interactions on mobile device
□ Test keyboard navigation (Tab, Enter, Escape)
□ Test with screen reader (VoiceOver / NVDA)
□ Check for console errors
□ Verify all animations smooth (60fps)
```

---

## Common Pitfalls

### ❌ Don't: React thinking
```astro
<script>
  // React way - don't do this!
  function MyComponent() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
  }
</script>
```

### ✅ Do: Imperative DOM
```astro
<button id="my-btn">0</button>

<script>
  const btn = document.getElementById('my-btn');
  let count = 0;
  
  btn.addEventListener('click', () => {
    count++;
    btn.textContent = count;
  });
</script>
```

### ❌ Don't: Event handler in template
```astro
<button onclick="handleClick(event)">Click me</button>
```

### ✅ Do: Event listener in script
```astro
<button id="my-btn">Click me</button>

<script>
  document.getElementById('my-btn').addEventListener('click', handleClick);
</script>
```

---

## Astro-Specific Tips

1. **Use `define:vars` to pass props to scripts**
   ```astro
   <script define:vars={{ items, count }}>
     console.log(items, count); // Available in script
   </script>
   ```

2. **CSS scoped to component automatically**
   ```astro
   <style>
     /* Only applies to this component */
     button { /* ... */ }
   </style>
   ```

3. **Client-side scripts with `is:inline`**
   ```astro
   <script is:inline>
     // Inline script, not bundled
   </script>
   ```

4. **Query selectors from component**
   ```astro
   <div id="my-component">
     <!-- Content -->
   </div>

   <script>
     const component = document.getElementById('my-component');
     // Now safe to query within this component
   </script>
   ```

---

## Migration Velocity

- **Simple components** (no state): 5 min each
- **State components**: 15 min each
- **Complex interactive**: 30 min each
- **Testing**: 10 min per component

**Estimate for full migration**: 40-50 components × avg 15 min = ~10-12 hours
