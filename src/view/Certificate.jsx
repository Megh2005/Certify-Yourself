import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import moment from 'moment';
import styles from '../assets/styles/certificateGenerator.module.scss';

const Certificate = ({ name, course, dateOfConductStart, dateOfConductEnd, signature, signatureDetails }) => {
  const handleDownloadPDF = async () => {
    const element = document.getElementById('certificate'); // Target the certificate container
    if (!element) {
      console.error('Certificate element not found.');
      return;
    }

    // Generate canvas from the certificate DOM
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    // Create a PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

    // Add the image to the PDF
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * scale, imgHeight * scale);
    pdf.save('tjp-certificate.pdf');
  };

  return (
    <>
      <div className={styles.certificateWrapper}>
        <div id="certificate" className={styles.certificateContainer}>
          <div>
            <img
              height={100}
              width={100}
              src="https://res.cloudinary.com/djyk287ep/image/upload/v1731852675/FAUGET-removebg-preview_vk7mlf.png"
              alt="logo"
            />
          </div>

          <h1>CERTIFICATE OF APPRECIATION</h1>
          <span className={styles.smallText}>This certificate is proudly awarded to</span>
          <p className={styles.primaryItalicText}>{name}</p>
          <span className={styles.smallText}>for successfully completing the course</span>
          <h2>{course}</h2>
          <span className={styles.smallText}>{`conducted from ${
            dateOfConductStart ? moment(dateOfConductStart).format('MMMM YYYY') : '-'
          } to ${dateOfConductEnd ? moment(dateOfConductEnd).format('MMMM YYYY') : '-'}`}</span>
          <div className={styles.signatureBlock}>
            <img className={styles.signatureImage} src={signature.preview} alt="" />
            <span className={styles.horizontalBar} />
            <span className={styles.smallText}>{signatureDetails}</span>
          </div>
        </div>

        <button style={{ marginTop: '3rem' }} onClick={handleDownloadPDF}>
          Download PDF
        </button>
      </div>
    </>
  );
};

export default Certificate;
