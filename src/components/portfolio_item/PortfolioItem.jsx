import "./portfolioitem.scss";

function PortfolioItem({ portfolio }) {
  return (
    <div className="portfolioitem">
      <div>{portfolio.coin}</div>
      <div className="port_buttons">
        <div className="green">
          <button className="btn btn-primary">Deposit</button>
        </div>
        <div className="red">
          <button
            className="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal2"
          >
            Withdraw
          </button>
        </div>
        {/* <!-- Modal --> */}
        <div
          class="modal fade"
          id="exampleModal2"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title withdraw" id="exampleModalLabel">
                  Withdraw
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  on
                ></button>
              </div>
              <div class="modal-body with">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label with">
                    To address
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter address"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label with">
                    Amount
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="0.086 BTC"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label with">Transaction Speed</label>
                  <div className="btn-flex d-grid gap-2">
                    <button className="btn btn-light">Low</button>
                    <button className="btn btn-primary">Standard</button>
                    <button className="btn btn-light">High</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>{portfolio.amount}</div>
    </div>
  );
}

export default PortfolioItem;
