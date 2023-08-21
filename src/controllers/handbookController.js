import handbookService from '../services/handbookService';
let getAllHandbook = async (req, res) => {
    try {
      let infor = await handbookService.getAllHandbook();
      return res.status(200).json(infor);
    } catch (e) {
      console.log(e);
      return res.status(200).json({
        errCode: -1,
        errMessage: "error from server...",
      });
    }
  };

module.exports ={
    getAllHandbook: getAllHandbook
}