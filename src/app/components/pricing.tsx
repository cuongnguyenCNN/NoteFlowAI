function Pricing() {
  return (
    <section id="pricing" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Gói dịch vụ</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold">Miễn phí</h3>
          <p className="text-gray-600 mb-4">0₫/tháng</p>
          <ul className="text-left">
            <li>Ghi chú từ YouTube</li>
            <li>Ghi chú từ PDF</li>
            <li>Chuyển giọng nói thành văn bản</li>
          </ul>
          <button className="mt-4 py-3 px-6 bg-blue-600 text-white rounded-xl">
            Dùng ngay
          </button>
        </div>
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold">Pro</h3>
          <p className="text-2xl font-bold mb-4">99.000₫/tháng</p>
          <ul className="text-left">
            <li>Mind Map</li>
            <li>Lưu trữ đám mây</li>
            <li>Ưu tiên hỗ trợ</li>
          </ul>
          <button className="mt-4 py-3 px-6 bg-white text-blue-600 rounded-xl">
            Nâng cấp Pro
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold">Doanh nghiệp</h3>
          <p className="text-gray-600 mb-4">Liên hệ</p>
          <ul className="text-left">
            <li>Ghi chú không giới hạn</li>
            <li>Đào tạo nội bộ</li>
            <li>Hỗ trợ doanh nghiệp</li>
          </ul>
          <button className="mt-4 py-3 px-6 bg-blue-600 text-white rounded-xl">
            Liên hệ ngay
          </button>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
