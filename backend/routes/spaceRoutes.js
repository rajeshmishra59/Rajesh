// 📁 backend/routes/spaceRoutes.js

const express = require('express');
// ✨ महत्वपूर्ण सुधार: authmiddleware.js फ़ाइल का सही नाम उपयोग करें ✨
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authMiddleware.js'); 
const {
    addSpace,
    getAllSpaces,
    getSpaceById,
    updateSpace,
    deleteSpace,
    getAvailableSpaces, 
    bookSpace,          
    assignSpaceToStudent 
} = require('../controllers/spaceController');

const router = express.Router();

// -----------------------------------------------------------------------------
// स्पेस से संबंधित रूट्स
// -----------------------------------------------------------------------------

// नया GET route: सभी स्पेसेस प्राप्त करें (एडमिन, मैनेजर, वार्डन अनुमति) - /api/spaces पर काम करेगा
router.get('/', isAuthenticatedUser, authorizeRoles('Admin', 'Manager', 'Warden'), getAllSpaces);

// एक नया स्पेस जोड़ें (केवल एडमिन, मैनेजर अनुमति)
router.post('/admin/space/new', isAuthenticatedUser, authorizeRoles('Admin', 'Manager'), addSpace);

// सभी स्पेसेस प्राप्त करें (एडमिन, मैनेजर, वार्डन अनुमति) - admin path वाला भी रखा है, backward compatibility के लिए
router.get('/admin/spaces', isAuthenticatedUser, authorizeRoles('Admin', 'Manager', 'Warden'), getAllSpaces);

// ID द्वारा एक सिंगल स्पेस प्राप्त करें (एडमिन, मैनेजर, वार्डन अनुमति)
router.get('/admin/space/:id', isAuthenticatedUser, authorizeRoles('Admin', 'Manager', 'Warden'), getSpaceById);

// स्पेस अपडेट करें (एडमिन, मैनेजर अनुमति)
router.put('/admin/space/:id', isAuthenticatedUser, authorizeRoles('Admin', 'Manager'), updateSpace);

// स्पेस डिलीट करें (केवल एडमिन अनुमति)
router.delete('/admin/space/:id', isAuthenticatedUser, authorizeRoles('Admin'), deleteSpace);

// -----------------------------------------------------------------------------
// बुकिंग और असाइनमेंट के लिए नए रूट्स
// -----------------------------------------------------------------------------

// सभी उपलब्ध स्पेसेस प्राप्त करें (बुकिंग फॉर्म के लिए)
router.get('/admin/spaces/available', isAuthenticatedUser, authorizeRoles('Admin', 'Manager', 'Warden'), getAvailableSpaces);

// एक स्पेस बुक करें (बुकिंग राशि और भुगतान विवरण के साथ)
router.post('/admin/space/book', isAuthenticatedUser, authorizeRoles('Admin', 'Manager', 'Warden'), bookSpace);

// एक बुक किए गए स्पेस को छात्र को असाइन करें (चेक-इन और अंतिम असाइनमेंट)
router.put('/admin/space/assign', isAuthenticatedUser, authorizeRoles('Admin', 'Manager', 'Warden'), assignSpaceToStudent);

module.exports = router;
